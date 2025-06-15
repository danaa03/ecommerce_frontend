import Header from '../components/Header';
import SignupCard from '../components/SignupCard';

export default function Signup () {
    return (
        <>
            <Header/>
            <div className="grid place-items-center bg-white min-h-screen">
                <SignupCard/>
            </div>
        </>
    );
}