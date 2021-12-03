import Navbar from './Navbar';
import { StoreContext } from '../utils/store';
import { useContext } from 'react';
import Load from './Load';

const Layout = ({ children }) => {
  const {
    state: { loading },
  } = useContext(StoreContext);
  const child = loading ? <Load /> : children;
  return (
    <div style={{ height: '100vh' }}>
      <Navbar />
      {child}
    </div>
  );
};

export default Layout;
