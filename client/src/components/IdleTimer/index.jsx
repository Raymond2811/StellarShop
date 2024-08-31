import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../utils/slices/userSlice';
import Auth from '../../utils/auth';

const IDLE_TIMEOUT = 15 * 60 * 1000;

export default function IdleTimer(){
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user)
  
  useEffect(() => {
    if(!isAuthenticated) return;

    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(logout())
        Auth.logout();
      },IDLE_TIMEOUT);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown',resetTimer);

    resetTimer();

    return() => {
      clearTimeout(timer);
      window.removeEventListener('mousemove',resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [dispatch, isAuthenticated]);

  return null;
}