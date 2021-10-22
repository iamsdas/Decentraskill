import { StoreContext } from '../utils/store';
import { useContext } from 'react';

function Banner() {
  const { state } = useContext(StoreContext);
  return (
    <div className=''>
      {/* TODO: change later */}
      <h1>{state.account || 'loading'}</h1>
    </div>
  );
}

export default Banner;
