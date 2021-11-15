function comment({ skills }) {
  return (
    <div>
      {skills.review.map((items, i) => {
        return (
          <div>
            <h1>username:{items.username}</h1>
            <h1>comment:{items.comment}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default comment;
