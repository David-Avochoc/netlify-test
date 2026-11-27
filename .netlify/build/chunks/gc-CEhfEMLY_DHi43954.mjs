import { l as TransferApprovalRepository } from "./approvals-DbCK12-7_CMfwSVX4.mjs";
import { n as TransferStage, t as TransferOperationRepository } from "./stage-Ctas_E7M_BvIWzg1C.mjs";
import { i as stagingPrefix } from "./keys-B5WUGmYK_C9ogdDPP.mjs";
// node_modules/emdash/dist/gc-CEhfEMLY.mjs
/** How long a finished import's staging is kept after its last state change. */
var IMPORT_STAGING_RETENTION_SECONDS = 86400;
var OBJECT_BATCH = 100;
var ROW_BATCH = 500;
async function collectTransferStaging(db, storage, options = {}) {
	const operationLimit = options.operations ?? 5;
	let objectBudget = options.objects ?? 1e3;
	let rowBatchBudget = options.rowBatches ?? 20;
	const result = {
		expired: 0,
		collected: 0,
		objectsDeleted: 0,
		rowsDeleted: 0
	};
	const operations = new TransferOperationRepository(db);
	result.expired = (await operations.expireDue(operationLimit)).length;
	await new TransferApprovalRepository(db).expireDue();
	const pending = await operations.listUncollected(operationLimit, { importRetentionSeconds: IMPORT_STAGING_RETENTION_SECONDS });
	for (const operation of pending) {
		if (objectBudget <= 0 || rowBatchBudget <= 0) break;
		try {
			const stage = new TransferStage(storage, stagingPrefix(operation.kind, operation.id, operation.stagingSecret));
			let objectsDone = false;
			while (objectBudget > 0) {
				const deleted = await stage.deleteSome(Math.min(OBJECT_BATCH, objectBudget));
				objectBudget -= deleted;
				result.objectsDeleted += deleted;
				if (deleted === 0) {
					objectsDone = true;
					break;
				}
			}
			if (!objectsDone) break;
			let rowsDone = false;
			while (rowBatchBudget > 0) {
				rowBatchBudget--;
				const deleted = await operations.deleteChildRows(operation.id, ROW_BATCH);
				result.rowsDeleted += deleted;
				if (deleted === 0) {
					rowsDone = true;
					break;
				}
			}
			if (!rowsDone) break;
			await operations.markCollected(operation.id);
			result.collected++;
		} catch (error) {
			console.error(`[transfer] Failed to collect staging for operation ${operation.id}:`, error);
		}
	}
	return result;
}
export { collectTransferStaging };
