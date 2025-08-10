

function getElementByClassName(root, className) {
    let res = [];

    function traverse(node) {
        if(node.nodeType === 1) {
            if(node.classList?.contains(className)) res.push(node)
            Array.from(node.childNodes).forEach(traverse)
        }
    }

    traverse(root);

    return res
}   

const nodes = getElementByClassName(document.getElementById("header"), 'title')
console.log(nodes)