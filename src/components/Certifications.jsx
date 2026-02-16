import useScrollReveal from '../hooks/useScrollReveal';

function Certifications() {
    const [ref, isVisible] = useScrollReveal();
    const certifications = [
        {
            title: 'OSCP+',
            org: 'OffSec',
            link: 'https://www.credential.net/4f6f441c-dcba-4d8c-ac62-faa90cba96d2#acc.iuqJUWT0',
            image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/169395686'
        },
        {
            title: 'OSCP',
            org: 'OffSec',
            link: 'http://credential.net/1bbc22f7-bb34-4ac4-b9af-3a06ea4f42c6#acc.qixI0hSy',
            image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/169395708'
        },
        {
            title: 'eJPT',
            org: 'INE',
            link: 'https://www.credential.net/593f1630-e2c4-4f93-a09e-0aa53c9e1d6d#acc.GVd9hpa2',
            image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/155839789'
        },
        {
            title: 'PT1',
            org: 'TryHackMe',
            link: 'https://assets.tryhackme.com/certification-certificate/68bb405dbe1b6d10ca8f6df0.pdf',
            image: '/images/pt1.png'
        },
        {
            title: 'CEH',
            org: 'EC-Council',
            link: 'https://www.credential.net/35f85649-8e8e-41ca-98ac-88d5fcfbde7e?username=sriharinarayan',
            image: '/images/ceh.png'
        },
        {
            title: 'OSWP',
            org: 'OffSec',
            link: 'https://www.credential.net/b229b082-32d0-447b-ad03-4fd370e5be50#acc.9HjJqXAt',
            image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/172345724'
        },
        {
            title: 'Certified AppSec Practitioner',
            org: 'The SecOps Group',
            link: 'https://www.credential.net/bdac2b63-f035-4ef5-94fa-cf9480f16ae4?username=sriharinarayan',
            image: '/images/cap.png'
        },
        {
            title: 'Certified NetSec Practitioner',
            org: 'The SecOps Group',
            link: 'https://www.credential.net/39beed5c-18d8-4077-8bf7-646664e3b063?username=sriharinarayan',
            image: '/images/cnsp.png'
        },
        {
            title: 'KLCP',
            org: 'OffSec',
            link: 'http://credential.net/d607010f-c9ee-44c3-a03e-1fd9e4e85244#acc.gp0xnXKS',
            image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/170788341'
        },
        {
            title: 'Ethical Hacking Essentials',
            org: 'EC-Council',
            link: 'https://www.credential.net/aa74e25b-b2b5-4130-9678-5a4ebefc0cb9?username=sriharinarayan',
            image: '/images/ehe.png'
        }
    ];

    return (
        <section
            id="certifications"
            ref={ref}
            className={`certifications section ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="container">
                <h2 className="section-title">Certifications</h2>
                <p className="section-description">My professional certifications and achievements</p>

                <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                        <div key={index} className="cert-card">
                            <div className="cert-embed-container">
                                <a href={cert.link} target="_blank" rel="noopener noreferrer">
                                    <img src={cert.image} alt={`${cert.title} Certification`} style={{ width: '100%', height: 'auto' }} />
                                </a>
                            </div>
                            <h3 className="cert-title">
                                {cert.title} <span className="cert-org">({cert.org})</span>
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;
