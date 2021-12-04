import { useContext, useEffect, useState, useCallback, Fragment } from 'react';
import { StoreContext } from '../utils';
import { useParams } from 'react-router';
import { Transition, Dialog } from '@headlessui/react';

const Comment = ({ skid }) => {
  const { state, setState } = useContext(StoreContext);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const getComments = useCallback(async () => {
    const cids = await state.contract.methods.endrs_of_skill(skid).call();
    cids.forEach(async (cid) => {
      if (!comments.some((comment) => comment.id === parseInt(cid))) {
        const comment = await state.contract.methods.endorsments(cid).call();
        setComments([
          ...comments,
          {
            id: parseInt(cid),
            endorser: (
              await state.contract.methods.employees(comment.endorser_id).call()
            ).name,
            date: comment.date,
            skid: skid,
            content: comment.comment,
          },
        ]);
      }
    });
  }, [comments, skid, state.contract]);

  useEffect(() => {
    setComments((comments) =>
      comments.filter((comment) => comment.skid === skid)
    );
  }, [skid]);

  const addComment = useCallback(async () => {
    const date = new Date();
    try {
      setState((state) => ({ ...state, loading: true }));
      await state.contract.methods
        .endorse_skill(
          id,
          skid,
          `${date.getMonth()} ${date.getFullYear()}`,
          newComment
        )
        .send({ from: state.account });
      getComments();
      setNewComment('');
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
    setState((state) => ({ ...state, loading: true }));
  }, [
    state.contract,
    id,
    getComments,
    skid,
    setState,
    newComment,
    state.account,
  ]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div>
      {comments.length ? (
        comments.map((comment) => (
          <div className='p-6 m-2 flex flex-row justify-between items-center bg-gray-200 border-solid rounded-lg '>
            <div>
              <p>
                <h1 className='font-medium text-lg text-blue-700 inline'>
                  <h1>{comment.endorser}</h1>
                  <h1>{comment.date}</h1>
                </h1>
              </p>
            </div>
            <div>
              <h1>{comment.content}</h1>
            </div>
          </div>
        ))
      ) : (
        <div>no comments yet</div>
      )}
      <div>
        <button
          className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm mx-6 px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
          type='button'
          onClick={() => {
            setIsOpen(true);
          }}>
          Add Comment
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => {
            setIsOpen(false);
          }}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  Add Comment
                </Dialog.Title>
                <div className='mt-2'>
                  <textarea
                    className='w-full p-2'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}></textarea>
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='bg-red-800 text-white active:bg-red-800 font-bold uppercase text-sm mx-6 px-8 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    onClick={() => {
                      addComment();
                    }}>
                    add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Comment;
