package com.example.thursdaytrivia

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.thursdaytrivia.ui.theme.ThursdaytriviaTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ThursdaytriviaTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colors.background
                ) {
                    Main()
                }
            }
        }
    }
}

@Composable
fun Main() {
    val img=painterResource(id = R.drawable.jetpack)
    Box {
        Image(painter =img , contentDescription ="compose logo" , modifier = Modifier
            .fillMaxSize()
            .padding(bottom = 350.dp))
        Text(text = "Sandesh Verma", fontSize = 40.sp,color= Color(56, 112, 179, 255),modifier=Modifier.padding(top =365.dp, start = 75.dp)
            )
        Text(text = "❤", fontSize = 65.sp,color= Color(8, 48, 66, 255), modifier = Modifier.padding(top =420.dp, start = 160.dp))
        
        Text(text = "Jetpack Compose", fontSize = 45.sp, modifier = Modifier.padding(top = 510.dp,start=20.dp))

    }





   

}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    ThursdaytriviaTheme {
        Main()
    }
}