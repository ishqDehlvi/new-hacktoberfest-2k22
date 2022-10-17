using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CarCollision : MonoBehaviour
{
    public CarMovements movement;


    void OnCollisionEnter(Collision collisionInfo)
    {
        if (collisionInfo.collider.tag == "Debris")
        {
            movement.enabled = false;
            FindObjectOfType<GameplayController>().GameOver();

            //FindObjectOfType<AudioManager>().Play("hurdleCollision");
        }
    }
}
