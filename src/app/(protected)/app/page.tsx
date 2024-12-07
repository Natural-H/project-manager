export default function DashboardPage() {
    return (
        <div className='outline h-full flex-1 w-full p-5'>
            <h1 className='font-bold text-3xl mb-5'>Dashboard</h1>
            <div className='flex-1'>
                <p>This is the dashboard page</p>
                <p>This page is protected by the auth middleware</p>
            </div>
        </div>
    )
}
