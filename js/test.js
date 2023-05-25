const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;

		if(this.current >= this.questions.length)
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		document.getElementById("forma").style.display = "block";
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
}

//Класс, представляющий вопрос
class Question
{
	constructor(text, answers)
	{
		this.text = text;
		this.answers = answers;
	}

	Click(index)
	{
		return this.answers[index].value;
	}
}

//Класс, представляющий ответ
class Answer
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}
}

//Класс, представляющий результат
class Result
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

//Массив с результатами
const results =
[
  new Result("Ваш уровень Английского - нулевой", 0),
	new Result("Ваш уровень Английского - (А1) – начальный: Вы понимаете и можете говорить, используя знакомые выражения и очень простые фразы для решения конкретных задач в ситуациях повседневного общения.", 8),
	new Result("Ваш уровень Английского - (А2) – ниже среднего: Вы можете рассказывать о себе, своей семье, профессии, предпочтениях. Понимаете, тексты рекламы, объявления в аэропорту, магазине.", 16),
	new Result("Ваш уровень Английского - (В1) – средний: Вы можете понимать, о чем идет речь в большинстве радио- и телепрограмм о текущих событиях. Знаете, как выразить собственное мнение, обосновывать свои взгляды.", 24),
  new Result("Ваш уровень Английского - (В2) – выше среднего: Вы владеете разговорным языком в различных ситуациях (от бытовых до профессиональных), можете без подготовки общаться с носителем языка.", 32),
  new Result("Ваш уровень Английского - (C1) – продвинутый: Вы понимаете разнообразные сложные развернутые тексты, умеете без подготовки не испытывая трудности выражать свои мысли.", 40),
	new Result("Ваш уровень Английского - (C2) –  профессиональный уровень владения : Вы свободно понимаете любую устную или письменную информацию, можете обобщить информацию. Вы умеете бегло и четко излагать свои мысли.", 48)
];

//Массив с вопросами
const questions =
[
	new Question("A lot of stars ___ in the sky at night.",
	[
		new Answer("a) are seen", 1),
		new Answer("b) seen", 0),
		new Answer("c) is seen", 0),
		new Answer("d) не знаю", 0)
	]),

	new Question("This information ___ on the Internet.",
	[
    new Answer("a) easily found", 0),
		new Answer("b) is easily found", 1),
		new Answer("c) is easily finds", 0),
		new Answer("d) не знаю", 0)
	]),

	new Question("Small towns ___ by cars.",
	[
    new Answer("a) isn’t block", 0),
		new Answer("b) aren’t blocked", 1),
		new Answer("c) isn’t block", 0),
		new Answer("d) не знаю", 0)
	]),

	new Question("This song ___ here.",
	[
    new Answer("a) often sung", 0),
		new Answer("b) is often sung", 1),
		new Answer("c) is often sings", 0),
		new Answer("d) не знаю", 0)
	]),

	new Question("The novel is written ___ a famous writer.",
	[
    new Answer("a) by", 1),
		new Answer("b) of", 0),
		new Answer("c) at", 0),
		new Answer("d) не знаю", 0)
	]),

	new Question("The office ___ every day.",
	[
    new Answer("a) isn’t cleaned", 1),
		new Answer("b) not is cleaned", 0),
		new Answer("c) is not cleaning", 0),
		new Answer("d) не знаю", 0)
	]),
  new Question("___ the milk ___ in the morning or in the afternoon?",
	[
    new Answer("a) Is, delivered", 1),
		new Answer("b) Is, deliver", 0),
		new Answer("c) Does, deliver", 0),
		new Answer("d) не знаю", 0)
	]),
  new Question("Water covers most of the Earth’s surface. Выберите верный способ перефразировать:",
	[
    new Answer("a) Most of the Earth’s surface are covered by water.", 0),
		new Answer("b) Most of the Earth’s surface is covered by water.", 1),
		new Answer("c) Most of the Earth’s surface covered by water.", 0),
		new Answer("d) не знаю", 0)
	]),
  new Question("___ grammar rules always ___ by heart?",
	[
    new Answer("a) Are, learn", 0),
		new Answer("b) Do, learnt", 0),
		new Answer("c) Are, learnt", 1),
		new Answer("d) не знаю", 0)
	]),
  new Question("English ___ here.",
	[
    new Answer("a) is speaking", 0),
		new Answer("b) is spoken", 1),
		new Answer("c) be spoken", 0),
		new Answer("d) не знаю", 0)
	]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length)
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}

		//Выводим номер текущего вопроса
		pagesElem.innerHTML = "Прогресс: " + (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Правильно: " + quiz.score + " / 50";
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index)
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct)
		{
			btns[index].className = "button button_wrong";
		}
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
