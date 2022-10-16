#!/usr/bin/env python
# coding: utf-8

# ## Importing the Dependencies

# In[1]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans


# ## Data Collection and Analysis

# In[2]:


# loading the data from a csv file to a Pandas dataframe
customer_data = pd.read_csv('Mall_Customers.csv')


# In[3]:


# first 5 rows of the dataframe
customer_data.head()


# In[4]:


# finding the number of rows and columns
customer_data.shape


# In[5]:


# getting some information about the dataset
customer_data.info()


# In[6]:


# checking for missing values 
customer_data.isnull().sum()


# choosing the annual income column and spending score column

# In[7]:


X = customer_data.iloc[:,[3,4]].values


# In[8]:


print(X)


# ## choosing the number of clusters

# WCSS -> within clusters sum of squares

# In[9]:


# Finding wcss value for different number of clusters

wcss = []

for i in range(1,11):
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    kmeans.fit(X)
    
    wcss.append(kmeans.inertia_)


# In[10]:


# plot an elbow graph

sns.set()
plt.plot(range(1,11), wcss)
plt.title('The elbow point graph')
plt.xlabel('Number of cluster')
plt.ylabel('WCSS')
plt.show()


# ## Optimum number of clusters = 5

# Training the k-Means clustering model

# In[11]:


kmeans = KMeans(n_clusters=5, init='k-means++', random_state=0)

# return a label for each data point based on their cluster
Y = kmeans.fit_predict(X)

print(Y)


# 5 clusters - 0,1,2,3,4

# ## Visualizing all the clusters

# In[12]:


# plotting all the clusters and their Centroids

plt.figure(figsize=(8,8))
plt.scatter(X[Y==0,0], X[Y==0,1], s=50, c='green', label='Cluster-1')
plt.scatter(X[Y==1,0], X[Y==1,1], s=50, c='red', label='Cluster-2')
plt.scatter(X[Y==2,0], X[Y==2,1], s=50, c='yellow', label='Cluster-3')
plt.scatter(X[Y==3,0], X[Y==3,1], s=50, c='violet', label='Cluster-4')
plt.scatter(X[Y==4,0], X[Y==4,1], s=50, c='blue', label='Cluster-5')

# plot the centroids
plt.scatter(kmeans.cluster_centers_[:,0], kmeans.cluster_centers_[:,1], s=100, c='cyan', label='Centroids')

plt.title('Customer Groups')
plt.xlabel('Annual income')
plt.ylabel('Spending score')
plt.show()

