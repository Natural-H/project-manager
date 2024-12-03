import LoginForm from "@/components/login/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex w-screen h-screen relative items-center justify-center">
            <img src="/login.jpg" alt="Background image for login form" className='absolute w-screen h-screen object-cover'/>
            <LoginForm />
       </main>
   )
}
