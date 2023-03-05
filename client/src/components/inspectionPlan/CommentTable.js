import React, { useState } from 'react';
import './CommentTable.css';

const CommentTable = ({ data, setData, approvalChecked, setApprovalChecked }) => {
  const [comments, setComments] = useState(data);

  const [showForm, setShowForm] = useState(false);

  const [comment, setComment] = useState('');
  const [commentDate, setCommentDate] = useState('');
  const [commenter, setCommenter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { comment, commentDate, commenter };
    setComments([...comments, { comment, commentDate, commenter }]);
    setData([...data, newComment]);
    setShowForm(false);
    setComment('');
    setCommentDate('');
    setCommenter('');
  };

  const handleApprovalChecked = (e) => {
    setApprovalChecked(e.target.checked);
  };

  return (
    <div className="comment-table">
      <div className="comment-header">
        <h2>Kommentit</h2>
        <div className="approval">
          <input type="checkbox" id="approval" name="approval" checked={approvalChecked} onChange={handleApprovalChecked} />
          <label htmlFor="approval">Esihenkilön hyväksyntä (nimi, pvm)</label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Kommentti</th>
            <th>Kommentti pvm</th>
            <th>Kommentoija</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => (
            <tr key={index}>
              <td>{comment.comment}</td>
              <td>{comment.commentDate}</td>
              <td>{comment.commenter}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-comment">
        {!showForm ? (
          <button onClick={() => setShowForm(true)}>Lisää</button>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Kommentti"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input
              type="text"
              placeholder="Kommentti pvm"
              value={commentDate}
              onChange={(e) => setCommentDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Kommentoija"
              value={commenter}
              onChange={(e) => setCommenter(e.target.value)}
            />
            <button type="submit">Tallenna</button>
            <button onClick={() => setShowForm(false)}>Peruuta</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentTable;
