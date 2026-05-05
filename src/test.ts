
import { Rectangle, Triangle, Circle, FigurePropertyChangeEvent } from './index';

async function test() {
    console.log('Тест создания фигур...');
    
    const rect = new Rectangle(10, 5, 'rect-1');
    const tri = new Triangle(3, 4, 5, 'tri-1');
    const circ = new Circle(7, 'circ-1');

    console.log('Прямоугольник:', rect.getParameters());
    console.log('Треугольник:', tri.getParameters());
    console.log('Круг:', circ.getParameters());

    console.log('\nТест расчётов...');
    console.log('Площадь прямоугольника:', await rect.getArea());
    console.log('Периметр прямоугольника:', rect.getPerimeter());
    console.log('Площадь треугольника:', await tri.getArea());
    console.log('Периметр треугольника:', tri.getPerimeter());
    console.log('Площадь круга:', await circ.getArea());
    console.log('Диаметр круга:', circ.getDiameter());
    console.log('Длина окружности:', circ.getCircumference());

    console.log('\nТест событий...');
    rect.addEventListener(FigurePropertyChangeEvent.EVENT_NAME, (event) => {
        const detail = (event as FigurePropertyChangeEvent).detail;
        console.log(`Событие: свойство "${detail.property}" изменено с ${detail.oldValue} на ${detail.newValue}`);
    });

    console.log('Изменяем ширину прямоугольника...');
    rect.width = 15;

    console.log('\nТест ошибок...');
    try {
        const badRect = new Rectangle(-1, 5);
    } catch (e) {
        if (e instanceof Error) {
            console.log('Ошибка создания прямоугольника:', e.message);
        }
    }

    try {
        const badTri = new Triangle(1, 1, 10);
    } catch (e) {
        if (e instanceof Error) {
            console.log('Ошибка создания треугольника:', e.message);
        }
    }

    console.log('\nВсе тесты пройдены!');
}

test().catch(console.error);