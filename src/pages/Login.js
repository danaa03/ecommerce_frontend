import Header from '../components/Header';
import LoginCard from '../components/LoginCard';

export default function Login () {
    return (
        <>
            <Header/>
            <div className="grid place-items-center bg-white min-h-screen">
                <LoginCard/>
            </div>
        </>
    );
}