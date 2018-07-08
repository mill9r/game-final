export function displayStyleForId(idList, cssList) {
    try {
        if (idList.length !== cssList.length) {
            throw new SyntaxError('Arrays are not equal');
        }
        for (let i = 0; i < idList.length; i++) {
            document.getElementById(idList[i]).style.display = cssList[i];
        }
    } catch (e) {
        console.log('Error in method displayStyleForId', e.toString())
    }

}