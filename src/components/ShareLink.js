const ShareLink = ({ link, isShare, setIsShare }) => {
  console.log(link);
  const shareToggle = () => {
    setIsShare(!isShare);
  };
  return (
    <div className="ShareLink">
      <div className="share-box">
        <div className="list s0">
          <p className="notice">밑의 링크를 복사 후 SNS에 공유해 보세요!</p>
        </div>
        <div className="list s1">
          <p className="link">{link}</p>
        </div>
        <div className="list s2" onClick={shareToggle}>
          <p className="closetext">닫기</p>
        </div>
      </div>
    </div>
  );
};

export default ShareLink;
