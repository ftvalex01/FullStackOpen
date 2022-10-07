
import {Part} from './Part'


export const Content = ({ parts }) => {

    return (
      <>
        {parts.map(element =>
            <Part key={element.id} part={element.name} exercises={element.exercises}/>
        )}
      </>
    );
  }