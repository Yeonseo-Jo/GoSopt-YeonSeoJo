import React from "react";

const Skeleton = () => {
  return <div></div>;
};

export default Skeleton;

const St = {
  SkelCardContainer: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.mint};
    border-radius: 1rem;
  `,
};
