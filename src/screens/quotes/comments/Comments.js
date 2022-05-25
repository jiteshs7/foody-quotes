import React, { useEffect, useState } from 'react';
import useHttp from '../../../hooks/use-http';
import {getAllComments,addComment} from '../../../utils/api';
import styles from './Comments.module.css';

const CommentForm = ({onAdd,onCancel}) => {

    const [comment,setComment] = useState('');
    const [error,setError] = useState('');

    const handleCommentChange = event => {
        setComment(event.target.value);
    }

    const onSubmit = () => {
        if(comment.trim('')==='') return setError('Please enter comment');
        setError('')
        onAdd(comment);
    }

    return(
    <div className={styles.commentContainer} >
        <div className={styles.inputContainer} >
            <textarea
                value={comment}
                onChange={handleCommentChange}
            />
            {error && <p>{error}</p>}
        </div>
        <div className={styles.btnContainer} >
            <button onClick={onSubmit} >Add comment</button>
            <button className={styles.cancelBtn} onClick={onCancel} >Cancel</button>
        </div>
    </div>
    )
}

function Comments({quoteId}) {

    const {sendRequest, status, data, error} = useHttp(getAllComments,true);
    const {sendRequest:sendComment, status:addStatus, data:addData, error:addError} = useHttp(addComment);

    const [isAdding,setIsAdding] = useState(false);
console.log('STATUS',data)
    useEffect(() => {
        sendRequest(quoteId);
    },[quoteId])

    const handleCommentAdd = text => {
        sendComment({text,quoteId})
        handleAddCmntCancel();
        sendRequest(quoteId);
    }

    const handleAddCmntCancel = () => {
        setIsAdding(prev => !prev)
    }

    if(status === 'pending') return <p>Loading...</p>

    if(error) return <p>Error:{error}</p>

    let commentsUI = null;

    if(status==='completed' && (!data || !data.length) ){
        commentsUI =  <div className={styles.comment} >No Comments found!</div>
    }else{
        
        commentsUI = data.map(item => {
            return <div className={styles.comment} >
                {item.text}
            </div>
        })
    } 
    
    const addCommentUI = isAdding? <CommentForm onAdd={handleCommentAdd} onCancel={handleAddCmntCancel} />
    : <button onClick={()=>setIsAdding(prev=>!prev)} >Add a comment</button>
    return (
        <div className={styles.container} >
            <h2>Comments</h2>
            {commentsUI}
            {addCommentUI}
        </div>
    );
}

export default Comments;