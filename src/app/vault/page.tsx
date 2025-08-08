export default function VaultPage() {
  return (
    <div className='p-10 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold tracking-tight'>Vault Dashboard (Dummy)</h1>
        <p className='text-gray-600 mt-2'>
          This is placeholder content. Replace with real data and components later.
        </p>
      </div>

      <section className='grid gap-6 md:grid-cols-3'>
        <div className='rounded-lg border border-gray-200 p-6 bg-white shadow-sm'>
          <h2 className='font-semibold mb-2'>Stat One</h2>
          <p className='text-3xl font-bold'>123</p>
          <p className='text-xs text-gray-400 mt-1'>Dummy metric description</p>
        </div>
        <div className='rounded-lg border border-gray-200 p-6 bg-white shadow-sm'>
          <h2 className='font-semibold mb-2'>Stat Two</h2>
          <p className='text-3xl font-bold'>456</p>
          <p className='text-xs text-gray-400 mt-1'>Another dummy metric</p>
        </div>
        <div className='rounded-lg border border-gray-200 p-6 bg-white shadow-sm'>
          <h2 className='font-semibold mb-2'>Stat Three</h2>
          <p className='text-3xl font-bold'>789</p>
          <p className='text-xs text-gray-400 mt-1'>Yet another dummy metric</p>
        </div>
      </section>

      <section className='rounded-lg border border-gray-200 p-6 bg-white shadow-sm'>
        <h2 className='font-semibold mb-4'>Recent Activity (Dummy)</h2>
        <ul className='space-y-2 text-sm text-gray-600'>
          <li>Uploaded file ProjectPlan.pdf</li>
          <li>Deleted file OldBudget.xlsx</li>
          <li>Renamed file Notes.txt → MeetingNotes.txt</li>
          <li>Shared file DesignMockup.png</li>
        </ul>
      </section>
    </div>
  );
}
