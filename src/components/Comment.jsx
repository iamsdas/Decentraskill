import { useContext, useEffect, useState, useCallback } from 'react';
import { StoreContext } from '../utils';

const Comment = ({ skid }) => {
  const { state } = useContext(StoreContext);
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    const cids = await state.contract.methods.endrs_of_skill(skid).call();
    cids.forEach(async (cid) => {
      if (!comments.some((comment) => comment.id === parseInt(cid))) {
        const comment = await state.contract.endorsments(cid).call();
        setComments([
          ...comments,
          {
            id: parseInt(comment.endorser_id),
            date: comment.date,
            content: comment.comment,
          },
        ]);
      }
    });
  }, [comments, skid, state.contract]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return comments.length ? (
    comments.map((comment) => (
      <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-200 border-solid rounded-lg '>
        <div>
          <div className='border-black w-5 h-5 border-solid rounded-full bg-gray-500 inline'>
            <div className='text-xl text-center p-6'>
              <i className='fas fa-user'></i>
            </div>
          </div>
          <p>
            <h1 className='font-medium text-lg text-blue-700 inline'>
              <h1>{comment.id}</h1>
              <h1>{comment.date}</h1>
            </h1>{' '}
          </p>
        </div>
        <div>
          <h1>comment:{comment.comment}</h1>
        </div>
      </div>
    ))
  ) : (
    <div>no comments yet</div>
  );
};

export default Comment;
