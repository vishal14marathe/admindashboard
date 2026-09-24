export default function EmptyState({ message = 'Nothing found' }) {
    return (
        <div className="text-center py-16 text-gray-500">
            <p className="text-lg">{message}</p>
        </div>
    );
}