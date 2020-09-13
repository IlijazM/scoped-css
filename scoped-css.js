function scope(scope, css) {
    css = css.replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "")

    const regex = /([^\r\n,{}]+)(,(?=[^}]*{)|\s*{)/g
    let m
    let replaceList = []

    while ((m = regex.exec(css)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }

        let match = m[0]
        const index = m.index
        match = match.trim()
        if (!match.startsWith('@') && !match.startsWith('from') && !match.startsWith('to') && !/[\d]/.test(match.substr(0, 1))) {
            let end = css.substr(index).trim()
            if (end.startsWith('#this')) end = end.substr(6)
            css = css.substring(0, index) + scope + ' ' + end
            regex.lastIndex += scope.length + 1
        }
    }

    return css
}

let SCOPEDCSSID = 0
function getUniqueStyleId() { return 'scoped-css-id-' + SCOPEDCSSID++ }

function scopeStyles(element) {
    let styles = Array.from(element.querySelectorAll('style[scoped]'))

    styles.forEach((styleElement) => {
        const parentElement = styleElement.parentElement
        const parentClass = getUniqueStyleId()
        parentElement.classList.add(parentClass)

        const style = scope("." + parentClass, styleElement.innerHTML)
        styleElement.innerHTML = style
        styleElement.removeAttribute('scoped')
    })

    styles = Array.from(element.querySelectorAll('style[scope]'))

    styles.forEach((styleElement) => {
        const style = scope(styleElement.attributes.getNamedItem('scope').value, styleElement.innerHTML)
        styleElement.innerHTML = style
        styleElement.removeAttribute('scope')
    })
}

function scopeAllStyles() { scopeStyles(document.querySelector('html')) }

scopeAllStyles()