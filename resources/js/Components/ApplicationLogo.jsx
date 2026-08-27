export default function ApplicationLogo({ className = 'h-10 w-auto' }) {
    return (
        <img
            src="/logo.png"
            alt="Cashflow TZ"
            className={className}
        />
    );
}