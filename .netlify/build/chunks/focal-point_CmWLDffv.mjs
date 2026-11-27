// node_modules/emdash/src/media/focal-point.ts
function isFocalCoordinate(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}
function normalizeFocalPoint(focalX, focalY) {
	if (!isFocalCoordinate(focalX) || !isFocalCoordinate(focalY)) return null;
	return {
		focalX,
		focalY
	};
}
function focalPointToObjectPosition(focalX, focalY) {
	const point = normalizeFocalPoint(focalX, focalY);
	if (!point) return void 0;
	return `${Math.round(point.focalX * 1e4) / 100}% ${Math.round(point.focalY * 1e4) / 100}%`;
}
export { normalizeFocalPoint as n, focalPointToObjectPosition as t };
