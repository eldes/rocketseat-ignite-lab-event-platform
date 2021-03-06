import classNames from 'classnames';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CheckCircle, Lock } from 'phosphor-react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { LessonType } from '../../models/Lesson';

type Props = {
  slug: string;
  title: string;
  availableAt: Date;
  lessonType: LessonType;
};

type Params = {
  slug: string;
};

const LessonBox:FunctionComponent<Props> = (props) => {

  const { slug } = useParams<Params>();
  const isLessonAvailable = isPast(props.availableAt);
  const isActiveLesson = (slug === props.slug);
  
  return (
    <Link to={`/event/lessons/${props.slug}`} className='group'>
      <span className='text-gray-300'>
        {format(props.availableAt, "EEEE '•' d 'de' MMMM '•' k'h'mm", {locale: ptBR})}
      </span>
      <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
        'bg-green-500': isActiveLesson,
      })}>
        <header className='flex items-center justify-between'>
          {isLessonAvailable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson,
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-orange-500': !isActiveLesson,
            })}>
              <Lock size={20} />
              Em breve
            </span>
          )}
          
          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold uppercase', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
          })}>
            {props.lessonType === LessonType.Live ? 'ao vivo' : 'aula prática'}
          </span>
        </header>
        <strong className={classNames('block mt-5', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson,
        })}>
          {props.title}
        </strong>
      </div>
    </Link>
  );
};

export default LessonBox;