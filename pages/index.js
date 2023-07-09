import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [alumniList, setAlumniList] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const alumni = {
      name,
      batch,
      linkedinUrl,
    };
    setAlumniList([...alumniList, alumni]);
    setName('');
    setBatch('');
    setLinkedinUrl('');
  };

  // Group alumni by batch
  const groupedAlumni = alumniList.reduce((acc, alumni) => {
    const batchKey = `${alumni.batch.slice(0, 2)}-${alumni.batch.slice(-2)}`;
    if (!acc[batchKey]) {
      acc[batchKey] = [];
    }
    acc[batchKey].push(alumni);
    return acc;
  }, {});

  return (
    <div className="container">
      <h1 className="title">Alumni Page</h1>
      <form onSubmit={handleFormSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Batch (e.g., IT-19)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter LinkedIn Profile URL"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">Submit</button>
      </form>
      <div className="alumni-list">
        <h2 className="list-heading">Alumni List</h2>
        {Object.entries(groupedAlumni).map(([batchKey, alumni]) => (
          <div key={batchKey} className="batch-container">
            <h3 className="batch-heading">{batchKey}</h3>
            <div className="grid">
              {alumni.map((alumniItem, index) => (
                <div key={index} className="alumni-item">
                  <div className="alumni-item-content">
                    <span className="name">{alumniItem.name}</span>
                    <a href={alumniItem.linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-url">
                      {alumniItem.linkedinUrl}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .button {
          padding: 10px 20px;
          background-color: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .alumni-list {
          margin-top: 40px;
        }

        .list-heading {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .batch-container {
          margin-bottom: 20px;
        }

        .batch-heading {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          grid-gap: 20px;
        }

        .alumni-item {
          background-color: #f1f1f1;
          padding: 20px;
          border-radius: 4px;
        }

        .alumni-item-content {
          display: flex;
          flex-direction: column;
        }

        .name {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .linkedin-url {
          color: #0070f3;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
