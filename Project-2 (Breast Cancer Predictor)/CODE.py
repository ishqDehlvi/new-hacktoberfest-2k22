#!/usr/bin/env python
# coding: utf-8

# ## Importing the Dependers

# In[1]:


import numpy as np
import pandas as pd
import sklearn.datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


# ## Data Collection & Processing

# In[2]:


# Loading the data from sklearn
breast_cancer_dataset = sklearn.datasets.load_breast_cancer()


# In[3]:


print(breast_cancer_dataset)


# In[4]:


# Loading the data to a data frame
data_frame = pd.DataFrame(breast_cancer_dataset.data, columns = breast_cancer_dataset.feature_names)


# In[5]:


# print the first 5 rows of the data frame
data_frame.head()


# In[6]:


# Adding the target column to the data frame
data_frame['label'] =  breast_cancer_dataset.target


# In[7]:


# print the last five rows of the dataset
data_frame.tail()


# In[8]:


# number of rows and columns in the dataset
data_frame.shape


# In[9]:


# getting some information about the data
data_frame.info()


# In[10]:


# checking for missing values
data_frame.isnull().sum()


# In[11]:


# stastistical measures about the data
data_frame.describe()


# In[12]:


# checking the distributin of the target variables
data_frame['label'].value_counts()


# 1 --> Benign
# 0 --> Malignant

# In[13]:


data_frame.groupby('label').mean()


# ## Separating the features amd targets

# In[14]:


x = data_frame.drop(columns='label', axis=1)
y = data_frame['label']


# In[15]:


print(x)


# In[16]:


print(y)


# ## Splitting the data in training and testing data

# In[17]:


X_train, X_test, Y_train, Y_test = train_test_split(x, y, test_size=0.2, random_state=2)


# In[18]:


print(x.shape, X_train.shape, X_test.shape)


# ## Model Training

# In[19]:


# Logistic regression 
model = LogisticRegression()


# In[20]:


# Training the LogisticRegression model using training data
model.fit(X_train, Y_train)


# ## Model Evaluation

# In[21]:


# Accuracy score on training data
X_train_prediction = model.predict(X_train)
training_data_accurancy = accuracy_score(Y_train, X_train_prediction)


# In[22]:


print("Accuracy on training data = ", training_data_accurancy)


# In[23]:


# Accuracy score on test data
X_test_prediction = model.predict(X_test)
test_data_accurancy = accuracy_score(Y_test, X_test_prediction)


# In[24]:


print("Accuracy on test data = ", test_data_accurancy)


# ## Building a predictive system

# In[28]:


input_data = (13.17,18.66,85.98,534.6,0.1158,0.1231,0.1226,0.0734,0.2128,0.06777,0.2871,0.8937,1.897,24.25,0.006532,0.02336,0.02905,0.01215,0.01743,0.003643,15.67,27.95,102.8,759.4,0.1786,0.4166,0.5006,0.2088,0.39,0.1179)

# change the input data to a numpy array
input_data_as_numpy_array = np.asarray(input_data)

# reshape the numpy array as we are predicting for one data point
input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

prediction =  model.predict(input_data_reshaped)
print(prediction)

if (prediction[0] == 0):
    print('The Breast Cancer is Malignant')

else:
    print('The Breast Cancer is Benign')

