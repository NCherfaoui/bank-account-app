for dir in */; do
  cd "$dir"
  mvn clean package -DskipTests
  cd ..
done