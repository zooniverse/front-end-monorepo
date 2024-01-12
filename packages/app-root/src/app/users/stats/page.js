// this will be refactored to import a UserStats component from lib-user, until then, this is a placeholder that is only completely formatted for light mode.

export default function UserPage() {
  return (
    <div>
      <div style={{
        borderRadius: '8px',
        border: '0.5px solid #A6A7A9',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
        color: 'black',
        height: '472px',
        marginBottom: '30px'
      }}>
        <p>User profile header goes here.</p>
        <p>Bar chart goes here.</p>
      </div>
      <div style={{
        borderRadius: '8px',
        border: '0.5px solid #A6A7A9',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
        color: 'black',
        height: '300px'
      }}>
        <p>Top projects goes here.</p>
      </div>
    </div>
  )
}
