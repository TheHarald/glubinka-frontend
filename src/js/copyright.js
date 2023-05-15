export function setCopyrightText() {
    const date = new Date()
    document.querySelector('.copyright').textContent = `\u00A9 ${date.getFullYear()} ООО «Глубинка»`
}