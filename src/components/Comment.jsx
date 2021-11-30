function comment({ skills }) {
  return (
    <div>
      {skills.review.map((items, i) => {
        return (
          <div className='p-2 m-2 flex flex-row justify-around items-center bg-gray-200 border-solid rounded-lg '>
            <div>
              <div className='border-black w-5 h-5 border-solid rounded-full bg-gray-500 inline'>
                <div className='text-xl text-center p-6'>
                  <i className='fas fa-user'></i>
                </div>
              </div>
              <p>
                <h1 className='font-medium text-lg text-blue-700 inline'>
                  <h1>{items.username}</h1>
                </h1>{' '}
              </p>
            </div>
            <div>
              <h1>comment:{items.comment}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default comment;
