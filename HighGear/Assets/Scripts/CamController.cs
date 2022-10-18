using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CamController : MonoBehaviour
{
    public Transform player;
    public Vector3 camOffset;

    // Update is called once per frame
    void Update()
    {
        transform.position = player.position + camOffset;
    }
}
