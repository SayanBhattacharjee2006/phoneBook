function Skeleton({ height = 4, width = "100%" }) {
  return (
    <div
      className="bg-gray-200 rounded animate-pulse"
      style={{
        height: `${height}rem`,
        width,
      }}
    />
  );
}

export default Skeleton;
