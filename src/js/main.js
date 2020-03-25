//= supportIE.js

//Обработка события Изменение имени товара
const toggleClassHidden = (nameEl, nameTxt) => {
	nameEl.classList.toggle('hidden');
	nameEl.nextElementSibling.classList.toggle('hidden');

	if(nameTxt) {
		nameEl.nextElementSibling.children[0].value = nameTxt;
	};

}
const editName = btn => {
	const productId = btn.closest('[data-id]').getAttribute('data-id');
	const newValue = btn.previousElementSibling.value;
	const nameEl = btn.parentElement.previousElementSibling;
	const url = 'https://jsonplaceholder.typicode.com/posts/1';

	if(newValue != nameEl.textContent){
		btn.classList.add('loading');
		
		fetch(url) //Фейковый запрос
			.then( () => {
				nameEl.textContent = newValue;
			})  
			.catch( (err) => {  
				console.error(`Возникла ошибка при изменении имени товара ${productId}: ${err}`);
			})
			.finally( () => {
				toggleClassHidden(btn.parentElement.previousElementSibling) 
				btn.classList.remove('loading'); });
	} else {
		toggleClassHidden(btn.parentElement.previousElementSibling);
	}
};

//Обработка клика по карточке товара
const clickProductCard = e => {
	const targetEl = e.target;
	 if(targetEl.classList.contains('js-edit-name')) {
	 	toggleClassHidden(targetEl, targetEl.textContent)
	 }else if(targetEl.classList.contains('js-save-name')) {
	 	editName(targetEl)
	 } else {
	 	return;
	 }
};

document.addEventListener('DOMContentLoaded',  () => {

	//Добавляем события ховера на элемент верхнего меню
	const itemContainer = document.querySelector('.item__container');
	document.querySelector('.js-table-view').addEventListener('mouseenter', () => itemContainer.classList.add('item__container_table'));
	document.querySelector('.js-table-view').addEventListener('mouseleave', () => itemContainer.classList.remove('item__container_table'));

	//Добавляем возможность перемещения карточек товара
	const itemsDragDrop = document.querySelectorAll('.js-drag');

	[].forEach.call(itemsDragDrop, (el) => {

		el.onclick = clickProductCard;

		el.draggable = true;
		el.ondragstart = e => {	//При захвате элемента добавляем класс и нужную информацию по перемещаемому элементу
			let drag = document.querySelector('.dragging');
			drag && drag.classList.remove('dragging');
			e.dataTransfer.setData("id", e.target.id); 
			el.classList.add('dragging');
		}
		el.ondragover = e => { //При перемещении над целевым элементом добавляем класс
			let old = document.querySelector('.over');
			old && old.classList.remove('over');
			el.classList.add('over');
			e.preventDefault();
		};
		el.ondragleave = e => { //Если ушли за обасть карточек - убираем классы
			let old = document.querySelector('.over');
			old && old.classList.remove('over');
		};
		el.ondrop = e => { //Обрабатываем событие дропа
			let drag = document.querySelector('.dragging');
			drag && drag.classList.remove('dragging');
			let over = document.querySelector('.over');
			over && over.classList.remove('over');

			let overHtml = el.innerHTML;
			let fromEl = document.querySelector('#'+e.dataTransfer.getData('id'));
			let dragHtml = fromEl.innerHTML;
			fromEl.innerHTML = overHtml;
			el.innerHTML = dragHtml;
		};
	});


}, false);