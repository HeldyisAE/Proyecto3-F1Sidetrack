export const adaptColorForTritanopia = (hex) => {
    if (!hex) return hex;
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return hex;

    const r = clean.slice(0, 2);
    const g = clean.slice(2, 4);
    const b = clean.slice(4, 6);

    return `#${r}${b}${g}`;
};

export const getTeamColor = (theme, hex) => {
    if (!hex) return '#888888';
    const color = hex.startsWith('#') ? hex : `#${hex}`;
    return theme === 'tritanopia' ? adaptColorForTritanopia(color) : color;
};