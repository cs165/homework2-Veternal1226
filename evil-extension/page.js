const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE',
  'there\n': 'their\n',
  'their\n': 'there\n',
  'they\'re\n': 'there\n',
  'There\n': 'Their\n',
  'Their\n': 'There\n',
  'They\'re\n': 'There\n',
  'THERE\n': 'THEIR\n',
  'THEIR\n': 'THERE\n',
  'THEY\'RE\n': 'THERE\n'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  if(node.nodeType == Node.TEXT_NODE){
    //console.log('origin='+node.textContent);
    let words=node.textContent.split(' '||'\n'||'\t');
    for(let i=0;i<words.length;i++){
      if(words[i]!==''&&words[i]!=='\n'&&words[i]!=='\n\n'){
        //console.log('1'+words[i]+'1');
        if(MATCH_LIST[words[i]] !== undefined) {
          console.log(words[i]+' ==> '+MATCH_LIST[words[i]]);
          words[i] = MATCH_LIST[words[i]];
        }
        if(words[i] !== "\n") {
          words[i] = words[i]+' ';
        }
      }
    }
    node.textContent = words.join('');
		//console.log('new='+node.textContent);
  }
  
	for(const child of node.childNodes) {
		transformTextNodes(child);
	}
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
