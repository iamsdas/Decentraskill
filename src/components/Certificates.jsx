import { useState, useContext, useCallback, useEffect, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { StoreContext } from '../utils/store';
import { useParams } from 'react-router';

function Certificates() {
  const [active, setActive] = useState(0);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [certificates, setCertificates] = useState([
    {
      id: null,
      name: ' ',
      issueDate: new Date(),
      validity: null,
      issuer: ' ',
      link: '',
    },
  ]);

  const { state } = useContext(StoreContext);

  const [newName, setNewName] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newValidity, setNewValidity] = useState();
  const [newIssueDate, setNewIssueDate] = useState(new Date());
  const [newLink, setNewLink] = useState('');
  const [style, setStyle] = useState('');

  const getCertificates = useCallback(async () => {
    try {
      const skillids = await state.contract.methods.skills_of_user(id).call();
      skillids.forEach(async (skid) => {
        const promises = [];
        const cids = await state.contract.methods.cert_of_skill(skid).call();
        cids.forEach(async (cid) => {
          if (!certificates.some((certi) => certi.id === parseInt(cid)))
            promises.push(state.contract.methods.certifications(cid).call());
        });
        if (promises.length > 0) {
          const newCertifications = (await Promise.all(promises)).map(
            (certi) => ({
              id: parseInt(certi.id),
              issueDate: certi.issue_date,
              validity: certi.valid_till,
              name: certi.name,
              link: certi.url,
              issuer: certi.issuer,
            })
          );
          setCertificates([...certificates, ...newCertifications]);
        }
      });
    } catch (e) {
      console.log('fetch error');
      console.error(e);
    }
  }, [certificates, id, state.contract]);

  const addCertificate = useCallback(async () => {
    if (certificates.some((certi) => certi.name === newName)) {
      alert('already exists');
    } else {
      try {
        setNewName('');
        setNewIssueDate('');
        setNewValidity();
        setNewIssuer('');
        setNewLink('');
        setShowModal(false);
        const skillids = await state.contract.methods.skills_of_user(id).call();
        console.log(skillids);
        if (skillids.length > 0) {
          await state.contract.methods
            .add_certification(
              state.accountId,
              newLink,
              newIssueDate,
              newValidity,
              newName,
              newIssuer,
              skillids[0]
            )
            .send({ from: state.account });
          getCertificates();
        } else throw new Error('no skill to link to');
      } catch (e) {
        console.error(e);
      }
    }
  }, [
    certificates,
    state,
    getCertificates,
    id,
    newIssueDate,
    newIssuer,
    newLink,
    newValidity,
    newName,
  ]);

  useEffect(() => {
    if (!state.connected) {
      setStyle('authenticated');
    }
    getCertificates();
  }, [getCertificates]);

  const ActiveItem = () => {
    switch (active) {
      case 1:
        return info(0);
      case 2:
        return info(1);
      case 3:
        return info(2);
      default:
        return <h1>No option selcted</h1>;
    }
  };

  const info = (i) => {
    return (
      <div>
        <h1>{certificates[i].name}</h1>
        <h2>Validity: {certificates[i].validity}</h2>
        <h2>{certificates[i].issuer}</h2>
        <h2>{certificates[i].link}</h2>
      </div>
    );
  };

  return (
    <div className='flex mx-auto p-0  h-full'>
      <sidebar className=' w-1/4 bg-gray-800 mx-0 sm:px-6 lg:px-8  float-left text-gray-300'>
        {certificates.map((item, i) => {
          return (
            <div
              key={i}
              className={`m-2 p-2 text-l hover:bg-gray-300 hover:text-gray-800 w-full`}
              onClick={(i) => {
                setActive(item.id);
              }}>
              {item.name}
            </div>
          );
        })}
        <div className={style}>
          <button
            className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
            type='button'
            onClick={() => setShowModal(true)}>
            Add Certificate
          </button>
        </div>
        {showModal ? (
          <div>
            {' '}
            <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
              <div className='relative w-auto my-6 mx-auto max-w-3xl'>
                {/*content*/}
                <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/*header*/}
                  <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
                    <h4 className='text-3xl font-semibold text-black text-center'>
                      Add New Certificate
                    </h4>
                    <button
                      className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}>
                      <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className='relative p-6 flex-auto my-4 text-black text-lg leading-relaxed'>
                    <form className='mx-auto'>
                      <label>Certificate Name: </label>
                      <input
                        placeholder='Eg:Web dev bootcamp'
                        className='border-solid border-black px-2'
                        type='text'
                        required
                        value={newName}
                        onChange={(e) => {
                          setNewName(e.target.value);
                        }}></input>
                      <br />
                      <div>
                        <label>Issue Date: </label>
                        <DatePicker
                          selected={newIssueDate}
                          onChange={(date) => setNewIssueDate(date)}
                        />
                      </div>
                      <br />
                      <label>Issuer: </label>
                      <select
                        value={newIssuer}
                        onChange={(e) => {
                          setNewIssuer(e.target.value);
                        }}>
                        <option value='udemy'>Udemy</option>
                        <option value='Coursera'>Coursera</option>
                        <option selected value=''>
                          NPTEL
                        </option>
                        <option value='Others'>Others</option>
                      </select>
                      <br />
                      <label>Validity:</label>
                      <select
                        value={newValidity}
                        onChange={(e) => {
                          setNewValidity(e.target.value);
                        }}>
                        <option value='Less then 3 Years'>
                          Less then 3 Years
                        </option>
                        <option value='3 - 5 Years'>3 - 5 Years</option>
                        <option selected value='5 - 10 Years'>
                          5 - 10 Years
                        </option>
                        <option value='10+ Years'>10+ Years</option>
                      </select>
                      <br />
                      <label>Link:</label>
                      <input
                        placeholder='Eg:udemy.com/hardikag17/webdbootcamp007'
                        required
                        className='border-solid border-black px-2'
                        value={newLink}
                        onChange={(e) => {
                          setNewLink(e.target.value);
                        }}></input>
                      <br />
                    </form>
                  </div>
                  {/*footer*/}
                  <div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
                    <button
                      className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}>
                      Close
                    </button>
                    <button
                      className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={addCertificate}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
          </div>
        ) : (
          <div></div>
        )}
      </sidebar>
      <main className='w-3/4 px-0 sm:py-6 sm:px-0 inline-block float-right mt-0'>
        {ActiveItem()}
      </main>
    </div>
  );
}

export default memo(Certificates);
