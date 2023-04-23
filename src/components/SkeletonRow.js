import React from 'react';
import Skeleton from "./Skeleton";

const SkeletonRow = () => {
    return (
        <div className='resultRow'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    );
};

export default SkeletonRow;