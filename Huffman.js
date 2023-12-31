class Node {
    constructor(freq, letter) {
        this.freq = freq;
        this.letter = letter;
        this.code = '';
        this.left = null;
        this.right = null;
    }

}

function getMinFreq(nodeArray) {
    let minF = 11101;
    let minNodId = -1;
    let minNod = null;
    for (let i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].freq < minF) {
            minF = nodeArray[i].freq
            minNodId = i;
        }
    }
    if (minNodId !== -1) {
        minNod = nodeArray[minNodId];
        nodeArray.splice(minNodId, 1);
    }

    return minNod;
}

function getCodes(root) {
    let queue = [];
    let dict = new Map();
    queue.push(tree[0]);

    while(queue.length !== 0) {
        let mainNode = queue.pop();
        
        if(mainNode !== null) {
            leftNeg = mainNode.left;
            rightNeg = mainNode.right;
        if(leftNeg !== null) {
            
            leftNeg.code = mainNode.code + '0';
        }
        if(rightNeg !== null) {
            
            rightNeg.code = mainNode.code + '1';
        }
    
        queue.push(leftNeg);
        queue.push(rightNeg);
        if(mainNode.letter !== null) {
            dict.set(mainNode.letter, mainNode.code)
        }
    }
}
    return dict;
}

function compress(codes, str) {
    let codedWord = "";
    for (i in str) {
        codedWord += codes.get(str[i]);
    }
    return codedWord;
}

function decompress(codes, str) {

    const codesRev = new Map();
    for (let [key, value] of codes) {
      codesRev.set(value, key);
    }

    let curLetter = "";
    let decWord = "";
    for (let i of str) {
        curLetter += i;
        if (codesRev.has(curLetter)){
            decWord += codesRev.get(curLetter);
            curLetter = "";
        }
    }
    return decWord;
}

//////////////
let tree = new Array()
let str = 'abraccccccadabra'
let alph = new Object();
//////////////

for (i = 0; i < str.length; i++) {
    if (alph[str.charAt(i)] == undefined)
        alph[str.charAt(i)] = 1;
    else
        alph[str.charAt(i)]++;
}

for (let i in alph) {
    let n = new Node(alph[i], i)
    tree.push(n)


}

while (tree.length > 1) {
    let Node1 = getMinFreq(tree);
    let Node2 = getMinFreq(tree);
    let newNode = new Node(Node1.freq + Node2.freq, null);

    Node1.code +='0';
    Node2.code += '1';
    newNode.left = Node1;
    newNode.right = Node2;
    tree.push(newNode);
}




let codes = getCodes(tree[0]);

console.table(codes);

const compressedWord = compress(codes, str);
console.log("Compressed word:", compressedWord);
console.log("Decompressed word:", decompress(codes, compressedWord))
