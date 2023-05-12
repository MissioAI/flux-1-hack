import React, { useState, useEffect } from 'react';
import type { BasicProfile } from "@datamodels/identity-profile-basic";
import { useCeramicContext } from './context'
import { authenticateCeramic } from './utils/CeramicUtils'
import styles from '../Home.module.css'

// Note: You will need to replace this import with a normal img tag or a react component
// import ceramicLogo from '../public/ceramic.png'

function LoginPage() {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient)
    await getProfile()
  }

  const getProfile = async () => {
    setLoading(true)
    if(ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
              name
              description
              gender
              emoji
            }
          }
        }
      `);
      
      setProfile(profile?.data?.viewer?.basicProfile)
      setLoading(false);
    }
  }
  
  const updateProfile = async () => {
    setLoading(true);
    debugger;
    if (ceramic.did !== undefined) {
      const update = await composeClient.executeQuery(`
        mutation {
          createBasicProfile(input: {
            content: {
              name: "${profile?.name}"
              description: "${profile?.description}"
              gender: "${profile?.gender}"
              emoji: "${profile?.emoji}"
            }
          }) 
          {
            document {
              name
              description
              gender
              emoji
            }
          }
        }
      `);
      await getProfile();
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if(localStorage.getItem('did')) {
      handleLogin()
    }
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Your Decentralized Profile</h1>
        {/* You need to replace this with an <img /> tag or a react component */}
        {/* <Image src={ceramicLogo} width="100" height="100" className={styles.logo} /> */}
        {profile === undefined && ceramic.did === undefined ? (
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
        ) : (
          <div className={styles.form}>
          <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                defaultValue={profile?.name || ''}
                onChange={(e) => {
                  setProfile({ ...profile, name: e.target.value });
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <input
                type="text"
                defaultValue={profile?.description || ''}
                onChange={(e) => {
                  setProfile({ ...profile, description: e.target.value });
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <input
                type="text"
                defaultValue={profile?.gender || ''}
                onChange={(e) => {
                  setProfile({ ...profile, gender: e.target.value });
                }}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Emoji</label>
              <input
                type="text"
                defaultValue={profile?.emoji || ''}
                onChange={(e) => {
                  setProfile({ ...profile, emoji: e.target.value });
                }}
                maxLength={2}
              />
            </div>
            <div className={styles.buttonContainer}>
              <button
              onClick={() => {
                updateProfile();
              }}>
                {loading ? 'Loading...' : 'Update Profile'}
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        <div>
          <a href="https://developers.ceramic.network" target="_blank">
            Learn about Ceramic
          </a>
        </div>
        <div>
          <a href="https://forum.ceramic.network" target="_blank">
            Ask Questions
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
