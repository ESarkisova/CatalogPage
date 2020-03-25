String.prototype.addSubStr = function(pos,str){
	let beforeStr = this.substring(0,pos);
	let afterStr = this.substring(pos,this.length);
	return beforeStr+str+afterStr;
}


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
const getString = () => {
	const num = +document.getElementById('js-input-number').value;
	const out = document.getElementById('out1');

	const bracket = ['(', '[', '{', ')', ']', '}'];

	const getPosition = str => {
		return Math.max(str.lastIndexOf(bracket[0]), str.lastIndexOf(bracket[1]), str.lastIndexOf(bracket[2]))+1
	}
	if(num > 0){
		let i = 0;
		let str = '';
		while(i < num){
			const brcIndex = getRandomInt(3);
			const subStr = `${bracket[brcIndex]}${bracket[brcIndex + 3]}`;
			getRandomInt(2) ? // 0 - вложенная скобка, 1 - соседняя
				str = str.addSubStr(getPosition(str), subStr)
				: str += subStr
			i++;
		}

		out.textContent = str;

	} else {
		out.textContent = 'Введите корректное значение';
		return;
	}	
}

const checkString = () => {
	const str = document.getElementById('js-input-string').value.trim();
	const out = document.getElementById('out2');

	const bracket = [
		{open:'(', close:')'},
		{open: '[', close:']'},
		{open: '{', close:'}'}
	]

	if(str){
		let arr = [];
		for(let i =0; i < str.length; i++ ){
			if(bracket.find(brc => brc.open === str[i])){
				arr.push(str[i]); //Все открывающие помещаем в массив
			} else if (bracket.find(brc => brc.close === str[i])
				&& arr.length 
				&& bracket.find(brc => brc.open === arr[arr.length-1]).close === str[i]){
				arr.pop(); //Если скобка закрывающая, при наличии открывающей - удаляем из массива
			} else {
				//В противном случае показываем ошибку
				out.textContent = 'Строка некорректна';
				return;
			}
		} 

		//Если цикл пройден и массив со скобками пуст - строка коррректна
		arr.length ? out.textContent = 'Строка некорректна' : out.textContent = 'Строка корректна';

	} else {
		out.textContent = 'Введите строку';
		return;
	}	
}

document.getElementById('js-get-string').onclick = getString;
document.getElementById('js-check-string').onclick = checkString;
