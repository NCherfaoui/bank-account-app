for dir in */; do
  cd "$dir"
  ./mvnw clean package -DskipTests
  cd ..
done