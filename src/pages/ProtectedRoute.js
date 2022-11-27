import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 没登陆 自动到landing
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  // 只有select user变化的时候 才会更新
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;
