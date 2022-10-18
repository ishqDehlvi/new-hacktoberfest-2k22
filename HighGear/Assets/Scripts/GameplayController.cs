using UnityEngine.SceneManagement;
using UnityEngine;

public class GameplayController : MonoBehaviour
{
    bool gameHasEnded = false;

    //public GameObject finishLevelUI;

    public float restartDelay = 1f;

    public void GameOver()
    {
        if (gameHasEnded == false)
        {
            gameHasEnded = true;
            Debug.Log("Game Over!");
            Invoke("Restart", restartDelay);
            FindObjectOfType<AudioManager>().Play("gameOver");
        }
    }

    void Restart()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    /*public void FinishLevel()
    {
        finishLevelUI.SetActive(true);
    }*/
}
