import React from 'react';

const Pagination = (props) => {
    const pageNumbers = [];
    console.log(props);

   let postsPerpage = props.postsPerPage;
    let totalPosts = props.totalPosts;


    for(let i = 1; i <= Math.ceil(totalPosts / postsPerpage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a className="page-link" onClick={() => props.paginate(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
