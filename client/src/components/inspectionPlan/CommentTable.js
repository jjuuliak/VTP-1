import React, { useState } from 'react';
import Table from '../ui/Table';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import styled from 'styled-components';

const CommentTableTitle = styled.h2`
  margin-bottom: 1rem;
`;

const Approval = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
`;

const CommentTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CommentTable = ({ data, setData, approvalChecked, setApprovalChecked }) => {
  const colWidths = ['33%', '33%', '34%'];

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
      <CommentTableHeader>
        <CommentTableTitle>Kommentit</CommentTableTitle>
        <Approval>
          <input type="checkbox" id="approval" name="approval" checked={approvalChecked} onChange={handleApprovalChecked} />
          <label htmlFor="approval">Esihenkilön hyväksyntä (nimi, pvm)</label>
        </Approval>
      </CommentTableHeader>
      <Table colWidths={colWidths}>
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
      </Table>
      <div className="add-comment">
        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>Lisää</Button>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Kommentti"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <TextInput
              type="text"
              placeholder="Kommentti pvm"
              value={commentDate}
              onChange={(e) => setCommentDate(e.target.value)}
            />
            <TextInput
              type="text"
              placeholder="Kommentoija"
              value={commenter}
              onChange={(e) => setCommenter(e.target.value)}
            />
            <Button type="submit">Tallenna</Button>
            <Button onClick={() => setShowForm(false)}>Peruuta</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentTable;
