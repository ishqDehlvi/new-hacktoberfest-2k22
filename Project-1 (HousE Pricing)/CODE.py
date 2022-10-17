#!/usr/bin/env python
# coding: utf-8

# ## Dragon Real Estate Price Predictor

# In[1]:


import pandas as pd


# In[2]:


housing = pd.read_csv("data.csv")


# In[3]:


housing.head()


# In[4]:


housing.info()


# In[5]:


housing['CHAS'].value_counts()


# In[6]:


housing.describe()


# In[7]:


get_ipython().run_line_magic('matplotlib', 'inline')


# In[8]:


#For plotting histogram
# import matplotlib.pyplot as plt
# housing.hist(bins=50, figsize=(20,15))


# ## Train-Test Splitting

# In[9]:


#For learning purpose only
import numpy as np
def split_train_test(data, test_ratio):
    np.random.seed(42)
    shuffled = np.random.permutation(len(data))
    test_set_size = int(len(data) * test_ratio)
    test_indices = shuffled[:test_set_size]
    train_indices = shuffled[test_set_size:]
    return data.iloc[train_indices], data.iloc[test_indices]


# In[10]:


# train_set, test_set = split_train_test(housing, 0.2)


# In[11]:


# print(f"Rows in train set: {len(train_set)}\nRows in test set: {len(test_set)}\n")


# In[12]:


from sklearn.model_selection import train_test_split
train_set, test_set = train_test_split(housing, test_size=0.2, random_state=42)
print(f"Rows in train set: {len(train_set)}\nRows in test set: {len(test_set)}\n")


# In[13]:


from sklearn.model_selection import StratifiedShuffleSplit
split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for train_index, test_index in split.split(housing, housing['CHAS']):
    strat_train_set = housing.loc[train_index]
    strat_test_set = housing.loc[test_index]


# In[14]:


housing = strat_train_set.copy()


# ## Looking for Correlations

# In[15]:


from pandas.plotting import scatter_matrix
attributes = ["MEDV","RM","ZN","LSTAT"]
scatter_matrix(housing[attributes], figsize = (12,8))


# In[16]:


housing.plot(kind="scatter", x="RM", y="MEDV", alpha=0.8)


# ## Trying-out Attribute Combinations

# In[17]:


housing["TAXRM"] = housing['TAX']/housing['RM'] 


# In[18]:


housing.head()


# In[19]:


corr_matrix = housing.corr()
corr_matrix['MEDV'].sort_values(ascending=False)


# In[20]:


housing.plot(kind="scatter", x="TAXRM", y="MEDV", alpha=0.8)


# In[21]:


housing = strat_train_set.drop("MEDV", axis=1)
housing_labels = strat_train_set["MEDV"].copy()


# ## Missing Attributes

# In[22]:


# To take care of missing attributes, you have three options:
#     1. Get rid of the missing data points
#     2. Get rid of the whole attribute
#     3. Set the values to some value(0, mean or median)


# In[23]:


a = housing.dropna(subset=["RM"]) #Option 1
a.shape


# In[24]:


housing.drop("RM", axis=1).shape #Option 2


# In[25]:


median = housing["RM"].median() # Compute median for option 3


# In[26]:


housing["RM"].fillna(median) #Option 3


# In[27]:


housing.shape


# In[28]:


from sklearn.impute import SimpleImputer
imputer = SimpleImputer(strategy = "median")
imputer.fit(housing)


# In[29]:


imputer.statistics_


# In[30]:


X = imputer.transform(housing)


# In[31]:


housing_tr = pd.DataFrame(X, columns=housing.columns)


# In[32]:


housing_tr.describe()


# ## Creating Pipeline

# In[33]:


from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
my_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy="median")),
    ('std_scaler', StandardScaler())
])


# In[34]:


housing_num_tr = my_pipeline.fit_transform(housing)


# In[35]:


housing_num_tr.shape


# ## Selecting a desired model for Dragon Real Estates

# In[36]:


from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
# model = LinearRegression()
# model = DecisionTreeRegressor()
model = RandomForestRegressor()
model.fit(housing_num_tr, housing_labels)


# In[37]:


some_data = housing.iloc[:5]


# In[38]:


some_labels = housing_labels.iloc[:5]


# In[39]:


prepared_data = my_pipeline.transform(some_data)


# In[40]:


model.predict(prepared_data)


# In[41]:


list(some_labels)


# ## Evaluating the model

# In[42]:


from sklearn.metrics import mean_squared_error
housing_predictions = model.predict(housing_num_tr)
mse = mean_squared_error(housing_labels, housing_predictions)
rmse = np.sqrt(mse)


# In[43]:


rmse


# ## Using better evaluation technique - Cross Validation

# In[44]:


from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, housing_num_tr, housing_labels, scoring="neg_mean_squared_error", cv=10)
rmse_scores = np.sqrt(-scores)


# In[45]:


rmse_scores


# In[46]:


def print_scores(scores):
    print("Scores :", scores)
    print("Mean: ", scores.mean())
    print("Standard deviation: ", scores.std())


# In[47]:


print_scores(rmse_scores)


# ## Saving the model

# In[48]:


from joblib import dump, load
dump(model, 'Dragon.joblib')


# ## Testing the model on test data

# In[52]:


X_test = strat_test_set.drop("MEDV", axis=1)
Y_test = strat_test_set["MEDV"].copy()
X_test_prepared = my_pipeline.transform(X_test)
final_predictions = model.predict(X_test_prepared)
final_mse = mean_squared_error(Y_test, final_predictions)
final_rmse = np.sqrt(final_mse)
# print(final_predictions, list(Y_test))


# In[50]:


final_rmse


# In[54]:


prepared_data[0]


# ## Using the model

# In[55]:


from joblib import dump,load
import numpy as np
model = load('Dragon.joblib')
features = np.array([[-0.43942006,  3.12628155, -1.12165014, -0.27288841, -1.42262747,
       -0.23993471, -1.31238772,  2.61111401, -1.0016859 , -0.5778192 ,
       -0.97491834,  0.41164221, -0.86091034]])
model.predict(features)


# In[ ]:




