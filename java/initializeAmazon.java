    public AmazonS3 initializeAmazon() {
        AWSCredentials credentials =
                new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        return AmazonS3ClientBuilder
                .standard()
                .withRegion("ap-south-1")
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }
